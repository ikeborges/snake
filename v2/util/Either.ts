class Success<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  get isSuccess(): true {
    return true;
  }

  get isFailure(): false {
    return false;
  }
}

class Failure<T> {
  private readonly _error: T;

  constructor(error: T) {
    this._error = error;
  }

  get error(): T {
    return this._error;
  }

  get isSuccess(): false {
    return false;
  }

  get isFailure(): true {
    return true;
  }
}

export type Either<F, S> = Failure<F> | Success<S>;

export function failure<T>(error: T) {
  return new Failure(error);
}

export function success<T>(value: T) {
  return new Success(value);
}
