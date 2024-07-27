import { Message } from "primeng/api";
import { Observable, OperatorFunction, tap } from "rxjs";

export function toastMessage(message: Message) {
    return function<T>(source: Observable<T>) {
        return source.pipe(tap(() => ))
    }
}