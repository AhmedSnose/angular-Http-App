import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler){
    console.log('HereSomeModifications');
    const modifiedRequest = req.clone({headers : req.headers.append('auth' , 'xyz')})    
    return next.handle(modifiedRequest)
  }   
}
