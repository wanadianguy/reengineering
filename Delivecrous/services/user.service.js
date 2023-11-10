const UserRepository = require("../repositories/user.repository");
const CartService = require("./cart.service");
const bcrypt = require('bcrypt');

const UserService = {
    findAll: async () => {
        return await UserRepository.findAll();
    },

    findById: async(id) => {
        const user = await UserRepository.findById(id);
        return user;
    },

    create: async (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
        await UserRepository.create(user);
    },

    update: async (id, userInfo) => {
        const user = await UserRepository.findById(id);
        if(!user) {
            throw Error("user not found");
        }

        if(userInfo.password != null) {
            userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        }

        return await UserRepository.update(id, userInfo);
    },

    delete: async (id) => {
        const user = await UserRepository.findById(id);

        if(!user) {
            throw Error("user not found");
        }

        await CartService.deleteUserCarts(user._id);
        return await UserRepository.delete(id);
    },

    encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      },

    checkPassword: async (username, password) => {
        const userLogin = await UserRepository.getUserByNameAndPassword(username);
    
        if (userLogin && (await bcrypt.compare(password, userLogin.password))) {
            userLogin.password = null;
            return userLogin;
        }
    
        return null;
      },
};

module.exports = UserService;