class Controller {
  constructor() {}
  handleResponse(result, res) {
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result);
    }
  }
}

module.exports = Controller;
