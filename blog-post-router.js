const express = require('express');
const router = express.Router();
const {ListPosts} = require('./blog-post-model');

router.get('/blog-posts', (req, res, next) => {
	let postsArray = ListPosts.get();
	if(postsArray){
		res.status(200).json({
			message : "Successfully sent the list of posts",
			status : 200,
			posts : postsArray
		});
	}
	else{
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		})
        next()
	}
});

router.get('/blog-posts/:author*?', (req, res, next) =>{
	
	let authorName = req.params.author;

	//wont work unless the path is different to the one that sends the list of posts.
	if(!(authorName)){
		res.status(406).json({
			message: "No author found in path",
			status: 406
		});
		next();
	}

	let authorPosts = ListPosts.getAuthor(authorName) ;

	if(authorPosts.length == 0 || authorPosts == undefined){
		res.status(404).json({
			message: `No ${authorName} ' s post found`,
			status: 404
		});
		next();
	}

	res.status(200).json({
			message: `Successfully found ${authorName} 's posts`,
			status: 200,
			Authorposts : authorPosts
		});
});

router.post('/blog-posts', (req, res, next) =>{

	let requireFields = ["title", "content", "author", "publishDate"];
	let postbody = req.body;

	for( let i = 0; i < requireFields.length; i++){
		let currentField = requireFields[i];
		if( !(currentField in req.body)){
			res.status(406).json({
				message: `Missing field ${currentField} in body`,
				status: 406
			}).send("Finish");
		}
	}

	const objectToAdd = ListPosts.addPost(postbody);

	res.status(201).json({
		message: `Succesfully added post`,
		status: 201,
		postAdded : objectToAdd
	});

});

router.delete('/blog-posts/:id*?', (req,res, next) => {

	if (!(req.params.id)) {
        res.status(406).json({
            message: `Missing field id in params.`,
            status: 406
        }).send("Finish");
        next();
    }
    

    if (!("id" in req.body)) {
        res.status(406).json({
            message: `Missing field id in body.`,
            status: 406
        }).send("Finish");
        next();
    }    

    let id = req.params.id;


    if( id != req.body.id){
    	res.status(406).json({
	        message: `Id's on body and params don't match`,
	        status: 406
	    }).send("Finish");
	    next();
    }

    let found = ListPosts.delPost(id);

    if(found){
    	return res.status(204).json({
                message: `Successfully deleted post`,
                status: 204,
                postDeleted : found
            }).send("Finish");
    	next();
    }
    else {
    	res.status(404).json({
	        message: `Post with id: ${id} doesn't exist`,
	        status: 404
	    }).send("Finish");
	    next();
    }
});

router.put('/blog-posts/:id*?', (req, res, next) =>{

	if (!(req.params.id)) {
        res.status(406).json({
            message: `Missing field id in params.`,
            status: 406
        });
    }

    let requireFields = ["title", "content", "author", "publishDate"];
    let fields = 3;
	for( let i = 0; i < requireFields.length; i++){
		let currentField = requireFields[i];
		if(!(currentField in req.body))
			fields--;
	}

	if(fields < 0){
		res.status(404).json({
			message: `Missing least one field in body`,
			status: 404
		});
		next();
	}

	let id = req.params.id;
	let postbody = req.body;

	let postUpdated = ListPosts.postUpdate(id, postbody);

	if(postUpdated == null){
		res.status(404).json({
	        message: `Post with id: ${id} doesn't exist`,
	        status: 404
	    });
	    next();
	}

	res.status(200).json({
				message: `Post updated`,
				status: 200,
				post : postUpdated
			});
	next();

});

module.exports = router
