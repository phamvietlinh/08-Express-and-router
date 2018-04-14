var router = global.router;
let Category = require('../models/CategoryModel');
let Food = require('../models/FoodModel');
var mongoose = require('mongoose')

router.post('/insert_new_category', (request, response, next) => {
	const criteria = {
		name: new RegExp('^' + request.body.name.trim() + '$', "i")
	};
	
	Category.find(criteria).limit(1).exec((err, categories) => {
		// console.log('abc');
		if(err){
			response.json({
				result: "failed",
				data: [],
				message: `Error is: ${err}`
			})
		}else {
			if(categories.length > 0){
				response.json({
					result: "failed",
					data: [],
					message: 'Can not insert because the name exists'
				})
			}else {
				const newCategory = new Category({
					name: request.body.name,
					description: request.body.description
				});

				newCategory.save((err, addedCategory) => {
					if(err){
						response.json({
							result: "failed",
							data: {},
							message: `Error is: ${err} ${categories.length}`
						})
					}else {
						response.json({
							result: "ok",
							data: addedCategory,
							message: "Insert new category successfully"
						})
					}
				})
			}
		}

	})
})

router.delete('/delete_a_category', (request, response, next) => {
	Category.findOneAndRemove({_id: mongoose.Types.ObjectId(request.body.category_id)}, (err) => {
		if(err){
			response.json({
				result: "failed",
				message: `Cannot delete a category. Error is: ${err}`
			})
			return;
		}
		Food.findOneAndRemove({categoryId: mongoose.Types.ObjectId(request.body.category_id)}, (err) => {
			if(err){
				response.json({
					result: "failed",
					message: `Cannot delete Food with categoryId: ${request.body.category_id}. Error is: ${err}`
				})
				return;
			}
			response.json({
				result: "ok",
				message: "Delete category and Food with categoryId successfully"
			})
		})
	})
})

module.exports = router;
