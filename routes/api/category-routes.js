const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findByPk, update } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      }, 
      include: [ Product ],
    })
    console.log("CATEGORDAY DATA", categoryData)
    if(!categoryData) {
      res.status(404).json({ message: 'Category not found with given id'});
      return;
    }

    res.status(200).json(categoryData); 
  } catch (err) {
    console.log("500 ERROR", err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ); 
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Category not found with given id'});
      return;
    }
    res.status(200).json('Category Updated Successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'Category not found with given id'});
      return;
    }
    res.status(200).json('Category Deleted Successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
