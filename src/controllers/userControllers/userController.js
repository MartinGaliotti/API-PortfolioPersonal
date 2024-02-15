const { User, Credentials, Address, ContactInfo } = require("../../db");

const createUserController = async ({
  name,
  surname,
  image,
  birthdate,
  description,
  address,
  contactInfo,
  credentials,
}) => {
  const { email, password } = credentials;

  //Error si faltan datos
  if (!name || !surname || !password || !email) {
    return { error: true, message: "Faltan datos" };
  }

  // Creando estructura del usuario
  const userToCreate = {
    name,
    surname,
  };
  image && (userToCreate.image = image);
  birthdate && (userToCreate.birthdate = birthdate);
  description && (userToCreate.description = description);

  //Creación del usuario
  const newUser = await User.create(userToCreate);
  //Creación de las credenciales
  const newCredentials = await Credentials.create({ email, password });
  //Juntando usuario con credenciales
  await newCredentials.setUser(newUser);

  if (address) {
    const { city, state, country, street, number, zipcode } = address;
    if (city || state || country || street || number || zipcode) {
      const newAddress = await Address.create({
        city,
        state,
        country,
        street,
        number,
        zipcode,
      });
      await newAddress.setUser(newUser);
    }
  }

  if (contactInfo && contactInfo?.length > 0) {
    let newArrayContactInfo = contactInfo.map((info) => {
      const { type, url } = info;
      if (type && url) {
        return ContactInfo.create({ type, url });
      }
    });
    if (newArrayContactInfo) {
      newArrayContactInfo = await Promise.all(newArrayContactInfo);
      const relations = await newArrayContactInfo.map((info) => {
        return info.setUser(newUser);
      });
      await Promise.all(relations);
    }
  }

  return { message: "Usuario creado", data: newUser };
};

const updateUserController = async ({
  name,
  surname,
  birthdate,
  description,
  contactInfo,
  address,
  image,
  id,
}) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  if (name || surname || description || birthdate || image) {
    const userToUpdate = await User.findByPk(id);
    name && (userToUpdate.name = name);
    surname && (userToUpdate.surname = surname);
    birthdate && (userToUpdate.birthdate = birthdate);
    description && (userToUpdate.description = description);
    image && (userToUpdate.image = image);
    await userToUpdate.save();
  }
  if (address) {
    const { city, state, country, street, number, zipcode } = address;
    if (city || state || country || street || number || zipcode) {
      const addressToUpdate = await Address.findOne({ where: { UserId: id } });
      city && (addressToUpdate.city = city);
      state && (addressToUpdate.state = state);
      country && (addressToUpdate.country = country);
      street && (addressToUpdate.street = street);
      number && (addressToUpdate.number = number);
      zipcode && (addressToUpdate.zipcode = zipcode);
      await addressToUpdate.save();
    }
  }
};

module.exports = { createUserController, updateUserController };
