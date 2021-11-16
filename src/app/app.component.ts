import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  loadedPosts : Post[] = [];
  isFetching = false
  error = null
  private errorSub : Subscription
  @ViewChild('postForm') form:any
  constructor(private http: HttpClient , private PostsService :PostsService) {}

  ngOnInit() {
   this.errorSub = this.PostsService.error.subscribe(erroMessage=>{
     this.error = erroMessage
    })
    

    this.isFetching = true
    this.PostsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false
      this.loadedPosts = posts
    } , error => {
      this.isFetching = false
      this.error = error.message
      console.log(error);
      
    });

  }

  onCreatePost(postData: Post) {

    this.PostsService.createAndStorePost(postData.title ,postData.content)

    // Send Http request
    console.log(postData);
    console.log(this.form);

    // this.http.post('https://angular-http-d05ef-default-rtdb.firebaseio.com/posts.json' , postData)
    // .subscribe(data => {
    //   console.log(data);

    // })

   
  }

  onFetchPosts() {
    this.isFetching = true
    this.PostsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false
      this.loadedPosts = posts
    });
  }


  onClearPosts() {
    this.PostsService.clearPosts().subscribe(()=>{
      this.loadedPosts= []
    })
    
  }

  // private fetchPosts(){ 
  //   this.isFetching = true
  //   this.http.get<{ [key : string] :Post }>('https://angular-http-d05ef-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(map(data=>{
  //     const postArray :Post[] = [];
  //     for (const key in data){
  //       if(data.hasOwnProperty(key)){
  //         postArray.push({...data[key],id:key})
  //       }
  //     }

  //     return postArray;
  //   }))
  //   .subscribe(data => {
  //     this.isFetching = false 
  //     this.loadedPosts = data
      
  //   })

  // }

  onHandleError(){
    this.error = null

  }

  ngOnDestroy(){
    this.errorSub.unsubscribe()
  }
  
}
