import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

export const TasksCollection = new Mongo.Collection('tasks');

Meteor.methods({
  'users.register'(nome, email, senha) {
    check(nome, String);
    check(email, String);
    check(senha, String);

    const userId = Accounts.createUser({
      email,
      password: senha,
      profile: {
        nome,
      },
    });

    return userId;
  },

  'users.login'(email, senha) {
    const user = Accounts.findUserByEmail(email);
  
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }
  
    if (!user.services || !user.services.password || !user.services.password.bcrypt) {
      throw new Meteor.Error('password-not-set', 'User has no password set');
    }
  
    const isValidPassword = Accounts._checkPassword(user, senha);
  
    if (!isValidPassword) {
      throw new Meteor.Error('incorrect-password', 'Incorrect password');
    }
  
    // Log in the user
    this.setUserId(user._id);
  
    // Return the user ID or any other result to indicate successful login
    return user._id;
  },
  'api.tasks.fetch'(userId) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized');
    }

    return TasksCollection.find({ userId: userId }).fetch();
  },

  'api.tasks.create'(userId, text) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized');
    }

    check(text, String);

    const task = {
      text,
      userId: userId,
    };

    const taskId = TasksCollection.insert(task);

    return TasksCollection.findOne(taskId);
  },

  'api.tasks.edit'(userId, taskId, newText) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized');
    }

    check(taskId, String);
    check(newText, String);

    const task = TasksCollection.findOne({ _id: taskId, userId: userId });

    if (!task) {
      throw new Meteor.Error('not-found', 'Task not found');
    }

    TasksCollection.update(taskId, { $set: { text: newText } });

    return TasksCollection.findOne(taskId);
  },

  'api.tasks.remove'(userId, taskId) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized');
    }
    console.log(userId, taskId)
    const task = TasksCollection.findOne({ _id: taskId, userId: userId });

    if (!task) {
      throw new Meteor.Error('not-found', 'Task not found');
    }

    TasksCollection.remove(taskId);
  },
}

);