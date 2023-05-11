namespace Application.Core
{
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        // T includes both Activity and Null, so we can filter not found requests
        public static Result<T> Success(T value) => new Result<T> { isSuccess = true, Value = value };

        public static Result<T> Failure(string error) => new Result<T> { isSuccess = false, Error = error };
    }
}