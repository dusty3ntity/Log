using API.Middleware;
using Application.Dictionaries;
using Application.Interfaces;
using Application.LearningLists;
using Application.Utilities;
using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    policy =>
                    {
                        policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins("http://localhost:3000");
                    });
            });

            services.AddMediatR(typeof(Details));
            services.AddAutoMapper(typeof(Details));

            services.AddControllers().AddNewtonsoftJson(opt =>
                    opt.SerializerSettings.ReferenceLoopHandling =
                        Newtonsoft.Json.ReferenceLoopHandling.Ignore
                )
                .AddFluentValidation(cfg =>
                {
                    cfg.RegisterValidatorsFromAssemblyContaining<Application.Dictionaries.Create
                    >();
                });

            services.AddScoped<ILearningListGenerator, LearningListGenerator>();
            services.AddScoped<ILearningListRemover, LearningListRemover>();
            services.AddScoped<IDuplicatesChecker, DuplicatesChecker>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}