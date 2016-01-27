Articles = new orion.collection('articles', {
	singularName: 'article',
	pluralName: 'articles',
	title: 'articles',
	link: {
		title: 'Articles'
	},
	tabular: {
		columns: [
			{ data: "first_name", title: "First Name" },
			{ data: "middle_names", title: "Middle Name(s)"},
			{ data: "surname", title: "Surname"},
			orion.attributeColumn('image', 'image', 'Picture'),
			orion.attributeColumn('summernote', 'medical', 'Medical'), 
			orion.attributeColumn('createdBy', 'createdBy', 'Created By'),
			orion.attributeColumn('createdAt', 'createdAt', 'Created On')
		]
	}
})


Articles.attachSchema(new SimpleSchema({
  first_name: {
    type: String,
    optional: false,
    label: 'First Name'
  },
  middle_names: {
    type: String,
    optional: true,
    label: 'Middle Names'
  },
  surname: {
    type: String,
    optional: false,
    label: 'Surname'
  },
  medical: orion.attribute('summernote', {
      label: 'Medical'
  }),
  image: orion.attribute('image', {
      label: 'Image',
      optional: true
  }),
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
