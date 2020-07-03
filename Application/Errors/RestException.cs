using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public ErrorType ErrorCode { get; }
        public object Errors { get; }

        public RestException(HttpStatusCode statusCode, ErrorType errorCode, object errors = null)
        {
            StatusCode = statusCode;
            Errors = new {code = errorCode, body = errors};
        }
    }
}