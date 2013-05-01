// Input Clearing
 
$.fn.cleardefault = function() {
    return this.focus(function() {
        if( this.value == this.defaultValue ) {
            this.value = '';
        }
    }).blur(function() {
        if( !this.value.length ) {
            this.value = this.defaultValue;
        }
    });
};
 
// Just add the .clearit class to a parent tag or input directly 
$('.clearit, .clearit input, .clearit textarea').cleardefault();