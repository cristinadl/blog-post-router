const uuid = require('uuid')

let postsArray = 	[
						{
							id: uuid.v4(),
							title : 'Title',
							content: 'just for example',
							author: "Cristina",
							publishDate: new Date()
						},

						{
							id: uuid.v4(),
							title : 'Title2',
							content: 'just for example2',
							author: "Cristina",
							publishDate: new Date("March 24 2019 21:00")
						},

						{
							id: uuid.v4(),
							title : 'Title2',
							content: 'just for example2',
							author: "Ricardo",
							publishDate: new Date("March 25 2019 10:00")
						},

						{
							id: uuid.v4(),
							title : 'Title3',
							content: 'just for example3',
							author: "Cristina",
							publishDate: new Date("March 26 2019 10:00")
						}
];

const ListPosts = {
	get : function() {
		return postsArray
	},
	getAuthor: function(authorName) {
		var authorPosts = [];
		for(let i = 0; i < postsArray.length; i++){
			if(postsArray[i].author == authorName)
				authorPosts.push(postsArray[i]);
		}
		return authorPosts;
	},
	addPost : function (postbody) {
		let title2add = postbody.title;
		let content2add = postbody.content;
		let author2add = postbody.author;
		let date2add = postbody.publishDate;

		let objectToAdd = {
			id: uuid.v4(),
			title : title2add,
			content : content2add,
			author : author2add,
			publishDate : new Date(date2add)
		}
		postsArray.push(objectToAdd);
		return objectToAdd;
	},
	delPost: function (id) {
		let post = null;
		for(let i = 0; i < postsArray.length; i++){
			if(postsArray[i].id == id){
				post = postsArray[i];
				postsArray.splice(i,1);
			}
		}
		return post;
	},
	postUpdate: function(id,postbody) {
		let post = null;
		for(let i = 0; i < postsArray.length; i++){
			if(id == postsArray[i].id){
				post = postsArray[i];
				if(postbody.title)
					post.title = postbody.title;
				if(postbody.content)
					post.content = postbody.content;
				if(postbody.author)
					post.author = postbody.author;
				if(postbody.publishDate)
					post.publishDate = new Date(postbody.publishDate);
			}
		}
		return post;
	}
}

module.exports = { ListPosts }