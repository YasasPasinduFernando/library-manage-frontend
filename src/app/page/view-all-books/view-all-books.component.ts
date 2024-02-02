import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//inheritance java වගේ
import { FormsModule } from '@angular/forms'; import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],//app module එක නැති නිසා ts import කරනවා http clientModule
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit {
  private http;
  public booklist: any = {};
  public selectedBook: any;


  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  ngOnInit(): void {
    this.loardBooks();
  }

  loardBooks() {
    this.http.get("http://localhost:8085/book/get") //asyncronize process එක පෙලර වෙන් න් ඈ
      .subscribe((data) => {
        this.booklist = data;
        console.log(data);

      })
  }

  deleteBook() {
    let api = "http://localhost:8085/book/" + this.selectedBook.id;
    this.http.delete(api,{responseType:'text'}).subscribe((responce:string) => {
      console.log("data");

      this.loardBooks();
      this.selectedBook = null;


    })

  }
  setSelectedBook(book: any) {
    this.selectedBook = book;
    console.log(book.id);

  }
}
