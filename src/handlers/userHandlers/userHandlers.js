const {
  createUserController,
  updateUserController,
} = require("../../controllers/userControllers/userController");

const createUserHandler = async (req, res) => {
  const {
    name,
    surname,
    birthdate,
    description,
    contactInfo,
    address,
    credentials,
    image,
  } = req.body;

  try {
    const response = await createUserController({
      name,
      surname,
      birthdate,
      contactInfo,
      description,
      image,
      address,
      credentials,
    });
    if (response.error) {
      res.status(400).json({ error: true, message: response.message });
    }
    res.status(201).json({ response, error: false });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
    console.log(error);
  }
};

const updateUserHandler = async (req, res) => {
  const { name, surname, birthdate, description, contactInfo, address, image } =
    req.body;
  const { id } = req.params;

  try {
    const response = await updateUserController({
      name,
      surname,
      birthdate,
      description,
      contactInfo,
      address,
      image,
      id,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = { createUserHandler, updateUserHandler };
