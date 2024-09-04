/* eslint-disable no-underscore-dangle */
class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    // console.log(data);
    // console.log(data.hapi);
    this._validator.validateImageHeaders(data.hapi.headers);

    // local storage implemented
    // const filename = await this._service.writeFile(data, data.hapi);

    // S3 implemented
    const fileLocation = await this._service.writeFile(data, data.hapi);
    // console.log(__dirname);

    const response = h.response({
      status: 'success',
      data: {
        // local storage
        // fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,

        // S3 implemented
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
