import { Injectable } from '@angular/core';

@Injectable()
export class ErrorServiceProvider {
   private error = {
    message: "",
    status: null,
  };
  constructor() {
    console.log('Hello ErrorServiceProvider Provider');
  }
  
  parseErrors(errors: any) {
    if (errors.status === 0) {
      this.error.message = "Check your internet connection or Server is down.";
      this.error.status = errors.status;
    } else if(errors) {
      this.error.message = "Token incorrect.";
      this.error.status = errors.status;
    }
    else{
      let body = JSON.parse(errors._body);
      this.error.message = body[0].errors.error_message;
      this.error.status = errors.status;
    }

    return this.error;
  }

  errorMessageIs(error: any) {
    return this.error.message;
  }
  errorStatusIs(error) {
    return this.error.status;
  }
}
