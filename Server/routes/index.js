/*
 * Variables
 */
var comodos = [
  {id: 0, nome: 'sala', status: 'ativo'},
  {id: 1, nome: 'quarto', status: 'ativo'}
];


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Pagina Inicial' })
};

exports.getComodos = function(req, res){
  if(req.is('json'))
    res.json(comodos);
  else
    res.render('comodo/comodos', {title: 'Comodos', comodos: comodos });
};

exports.getComodo = function(req,res){
  res.render('comodo/comodo', {title: 'Comodos', comodo: comodos[req.params.id]});
};
