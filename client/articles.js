Meteor.subscribe("articles");

Template.articles.helpers({
  articles: function () {
    return Articles.find();
  }
});