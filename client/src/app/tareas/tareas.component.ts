import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import gql from 'graphql-tag';


class Tarea {
  constructor(
    _id: any = "",
  title: string  = "",
  desc: string = "",
  createdAt: string = ""
  ) {}
}

export type Query = {
  allTareas: Tarea[];
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {


  tareas: Observable<Tarea[]>;
  tarea: Tarea;


  constructor(private apollo: Apollo) { 
      this.tarea = new Tarea();
  }



  displayTareas(){
    this.tareas = this.apollo.watchQuery<Query>({
      query: gql`
        query allTareas {
          allTareas {
            _id
            title
            desc
            createdAt
          }
        }
      `,
      fetchPolicy: "network-only"
    })
      .valueChanges
      .pipe(
        map(result => result.data.allTareas)
      );

  }
  ngOnInit() {
    this.displayTareas()
   
  }


  nuevo(){
    console.log(this.tarea);


    const createTarea = gql`
        mutation createTarea(
          $title: String!
          $desc: String!
        ) {
          createTarea(
            title: $title
            desc: $desc
            
          ) {
            _id
          }
        }
      `;
      
      this.apollo.mutate({
        mutation:createTarea,
        variables:{
          title: (this.tarea as any).title,
          desc: (this.tarea as any).desc

        }
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.displayTareas();
          this.tarea = new Tarea();
        },
        error => {
          console.log("Error:", error);
        }

      );







  }

}
