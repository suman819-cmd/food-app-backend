// // src/utils/apiResponse.ts
// class ApiResponse {
//   success: boolean;
//   message: string;
//   data?: any;
//   errors?: any;

//   constructor(statusCode: number, message: string = 'Success', data?: any, errors?: any) {
//     this.success = statusCode >= 200 && statusCode < 300;
//     this.message = message;
    
//     if (data) {
//       this.data = data;
//     }
    
//     if (errors) {
//       this.errors = errors;
//     }
//   }

//   // Static method for common responses
//   static success(message: string, data?: any) {
//     return new ApiResponse(200, message, data);
//   }

//   static created(message: string, data?: any) {
//     return new ApiResponse(201, message, data);
//   }

//   static error(statusCode: number, message: string, errors?: any) {
//     return new ApiResponse(statusCode, message, undefined, errors);
//   }

//   static badRequest(message: string, errors?: any) {
//     return new ApiResponse(400, message, undefined, errors);
//   }

//   static unauthorized(message: string = 'Authentication required') {
//     return new ApiResponse(401, message);
//   }

//   static forbidden(message: string = 'Access denied') {
//     return new ApiResponse(403, message);
//   }

//   static notFound(message: string = 'Resource not found') {
//     return new ApiResponse(404, message);
//   }

//   static serverError(message: string = 'Internal server error') {
//     return new ApiResponse(500, message);
//   }
// }

// export default ApiResponse;




















class ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: any;

  constructor(statusCode: number, message: string = 'Success', data?: any, errors?: any) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;

    if (data) this.data = data;
    if (errors) this.errors = errors;
  }

  static success(message: string, data?: any) {
    return new ApiResponse(200, message, data);
  }

  static created(message: string, data?: any) {
    return new ApiResponse(201, message, data);
  }

  static error(statusCode: number, message: string, errors?: any) {
    return new ApiResponse(statusCode, message, undefined, errors);
  }

  static badRequest(message: string, errors?: any) {
    return new ApiResponse(400, message, undefined, errors);
  }

  static unauthorized(message: string = 'Authentication required') {
    return new ApiResponse(401, message);
  }

  static forbidden(message: string = 'Access denied') {
    return new ApiResponse(403, message);
  }

  static notFound(message: string = 'Resource not found') {
    return new ApiResponse(404, message);
  }

  static serverError(message: string = 'Internal server error') {
    return new ApiResponse(500, message);
  }
}

export default ApiResponse;
