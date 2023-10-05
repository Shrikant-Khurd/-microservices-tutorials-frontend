//ng g c components/footer --inline-style=true --inline-template=true  
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
   <!-- <div class="footer">
    <h3 >Favorite Links</h3>
    
 </div>
 <div class="demo">
    <h4> LaunchCode </h4>
    <h4> WebElements </h4>

 </div> -->
<!-- Remove the container if you want to extend the Footer to full width. -->
<div class="mt-5">

<footer class="bg-dark text-center text-lg-start text-white">
  

   <!-- Copyright -->
   <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2021 Copyright:
      <a class="text-white" href="#">shrikantkh@cybage.com</a>
   </div>
   <!-- Copyright -->
</footer>

</div>
<!-- End of .container -->
  `,
  styles: [`
  
`]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
