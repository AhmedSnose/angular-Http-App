

import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class InterceterLoggingService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler){
    console.log('OutPuting');
    
    console.log(req.url);
    
    return next.handle(req).pipe(
      tap( e=> {
        if(e.type === HttpEventType.Response ) {
          console.log(e.body);
          console.log('Incoming response');
          
        }
      })
    )
  }   
}
