class Alert {
    //success massage
    static success(message = "") {
       return `<p class="alert alert-success alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"></span>
        </button>
       </p>`;
    }
    //warning massage
    static warning(message = "") {
        return `<p class="alert alert-warning alert-dismissible fade show" role="alert">
        ${message}
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
             <span aria-hidden="true"></span>
         </button>
        </p>`;
     }
     //danger massage
    static danger(message = "") {
        return `<p class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
         <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true"></span>
         </button>
        </p>`;
     }

}

export default Alert;