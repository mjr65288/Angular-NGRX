import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  panelOpenState = false;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {

    /**
     * The following example shows that once a value of map has bain captured, you
     * can modify the value and there is no ned to set the map with the new value
     * since the the change is made to the object reference, run code to see and undesrtand more.
     *
     * https://www.typescriptlang.org/play?ssl=28&ssc=8&pln=1&pc=1#code/FAYw9gdgzgLgBBArgWwDYEtYC4nIEYCmATnANoC6cAvGQIwA0ATPQMyvkDcwwqB8yAQwAOQ4ljgBZYQB5YRdBADm9BCkJEKAPmoICAd0nCAFAEouwXBlgA6AGZgiAUQEgAFkYLVtAb25x-cLzwAG4gAJIAJjpSMK52qGAORjFxRAIQEWDIpnAAVHC0AAwm1jBgAMow8kqmwAFwAPQN4NBgvNYJikahkSZ+AUFwoQAifALoqFDiuOoUAD6IGQS2CgRRNIIixNaKfN3hEWb9-i1QbQQdYF0A5IT2RJ7XcADUQyCjMOOTR3UB6LZwIwAQhGYwmUBMcF89XqTTgADkwHABEQ0gBPOBovgqM5wEAPAQwTyQTzpKKwByedDwe5wWKYOAANQAwr8YW8Pl8oDoKFx2f5NqIiNYoHsehEVKDPuCjuyAL5sgJwgCCESi9O5ETBqDpSI1TNZ7KlXOsQkQUHcBFlMNO50uNwEtiJJGuz2NMvMcp+gu292cbiMtkWIBg6EggOCAlQiAI0zUxAoKgA1gQ0eI5ApFJDoTbIGd2p0jCmMa8AERwcSlt1RmPW-xe8xwwY+ojiKRCWRVTMqGYJ8jaGgQfSGISmRsNQJ8BC0HDxjTkBZLFZD9ZwFs7PbXexga59YBw-7AiC0Ey+OH1Y88zj7if1deimBGUvb0s9k83uAKj-H03m9yME8uDhH8zQtIwWAAVh+JspwgRhZ3wPtFy1Zc1h0dddkfZ9ElLaCJzgoE7Acf1LS8PE8ztQsrT3bggA
     */
    const numlist: number[] = [1, 2, 3, 3];

    let mapper: Map<string, number[]> = new Map();

    numlist.forEach(e => {

      let vcId = Math.floor(Math.random() * 10).toString()
      //console.log(vcId)

      let vcDetails: number[] | undefined = mapper.get(vcId);

      console.log('before ' + vcDetails);

      if (!vcDetails) {
        // No array yet, so create one and store it for this VC
        vcDetails = [];
        mapper.set(vcId, vcDetails);
      }
      // Add this detail to this VC
      vcDetails.push(e);
      console.log('after ' + vcDetails);

    });

    mapper.forEach(function (value: number[], key: string) {
      console.log(key + " : " + value);
    });
  }


}
