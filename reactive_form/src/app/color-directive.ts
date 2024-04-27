import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: "[colordirective]",
})
 export class ColorDirective{
constructor(private element:ElementRef, private render:Renderer2){

    element.nativeElement.style.background= 'lightblue'
    // render.setStyle(element.nativeElement,'background','green')
    render.setStyle(element.nativeElement,'border','solid 2px black')
    render.setStyle(element.nativeElement,'list-style','none')
}
}