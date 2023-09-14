
// export class authResponse {
//     public email:string='';
//     public authToken:string='';
//     public id:string='';

//   }

  export class AuthResponse{
    constructor(
        public email:string,
        public authToken:string,
        ){}
}