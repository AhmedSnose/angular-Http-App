import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {catchError, map} from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}
  error = new Subject<string>()
  createAndStorePost(title: string, content: string){
    const postData:Post = {title: title, content: content}
    this.http.post('https://angular-http-d05ef-default-rtdb.firebaseio.com/posts.json' , postData)
    .subscribe(data => {
      console.log(data , "data");
    }) 
    // , error => {
    //   this.error.next(error.message)
    // }
    

  }

  fetchPosts(){ 
    let params = new HttpParams()
    params = params.append('print','pretty') 
    params = params.append('key','password') 

    console.log(params,  "params");
    
   return this.http.get<{ [key : string] :Post }>('https://angular-http-d05ef-default-rtdb.firebaseio.com/posts.json' , 
   {
     headers : new HttpHeaders({'hello':'Hellow Content'}) , 
     params : params
   })
    .pipe(map(data=>{
      const postArray :Post[] = [];
      for (const key in data){
        if(data.hasOwnProperty(key)){
          postArray.push({...data[key],id:key})
        }
      }

      return postArray;
    }), catchError(errorRes=>{
      return throwError(errorRes)
    }) 
    
    )

  }


  clearPosts(){
    return this.http.delete('https://angular-http-d05ef-default-rtdb.firebaseio.com/posts.json')
  }
}
