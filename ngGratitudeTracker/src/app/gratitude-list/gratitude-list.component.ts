import { GratitudeService } from './../services/gratitude.service';
import { Component, OnInit } from '@angular/core';
import { Gratitude } from '../model/gratitude';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gratitude-list',
  templateUrl: './gratitude-list.component.html',
  styleUrls: ['./gratitude-list.component.css']
})
export class GratitudeListComponent implements OnInit {

  title = 'Gratitude Tracker';
  selected = null;
  newGratitude = new Gratitude();
  editGratitude = null;

  gratitudes: Gratitude[] = [];

  constructor(
    private gratitudeSvc: GratitudeService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }



  displayGratitude(gratitude){
    //this.selected = null;
     this.router.navigateByUrl(`/gratitude/${gratitude.id}`);
  }

  showGratitude(id){
    this.gratitudeSvc.show((this.currentRoute.snapshot.paramMap.get('id'))).subscribe(
      good => {
        this.loadEntries();
      },
      bad => {
        console.error("GratitudeListComponent.show(): error")
      }
    )
  };

  displayTable(){
    this.selected = null;
  }

  ngOnInit(): void {
    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      this.gratitudeSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.selected = data;
        },
        bad => {
          this.router.navigateByUrl('notFound')
          console.error('TodoListComponent.reload(): error retrieving todo list');
          console.error(bad);
        }
        );
      }
      this.loadEntries();
    }

  loadEntries() {
    this.gratitudeSvc.index().subscribe(
      data => {this.gratitudes = data;
      },
      bad => {
        console.error("GratitudeListComponent.loadEntries(): error loading");
        console.error(bad);
      }
    );
  }


  createEntry(gratitude: Gratitude){
    console.log(gratitude);
    this.gratitudeSvc.create(gratitude).subscribe(
      good => {
        this.loadEntries();
        this.newGratitude = new Gratitude();
      },
      bad => {
        console.error("GratitudeListComponent.createEntry(): error adding");
        console.error(bad);
      })
  }

  setEditGratitude(){
    this.editGratitude = Object.assign({}, this.selected)
  }

  updateEntry(gratitude: Gratitude){
    console.log(gratitude);
   this.gratitudeSvc.update(gratitude).subscribe(
     good =>{
       this.loadEntries();
       this.editGratitude = null;
       this.selected = this.editGratitude;
     },
     bad => {
       console.error("GratitudeListComponent.updateEntry(): error updating");
       console.error(bad);
     })
  }

  deleteEntry(gratId: number){
    this.gratitudeSvc.destroy(gratId).subscribe(

      data => {
        this.loadEntries();
        this.selected = null;

      },
      err => {
        console.error("GratitudeListComponent.deleteEntry(): error deleting" + err);
      })
    };
  }


