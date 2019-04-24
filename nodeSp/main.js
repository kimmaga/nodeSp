const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000,()=>{
	console.log('Node Server is Start... ');
});
let users = [
	{
		id:1,
		name:'Alice'
	},
	{
		id:2,
		name:'bek'
	},
	{
		id:3,
		name:'chris'
	}
]
app.get('/',(req,res)=>{res.send('Hello World\n');});
app.get('/users',(req,res)=>res.json(users));
app.get('/users/:id',(req,res)=>{
	const id = parseInt(req.params.id,10);
	if(!id){
		return res.status(400).json({error:'Incorrect id'});
	}
	console.log(id);
	let user = users.filter(user => user.id === id)[0];
	if(!user){
		return res.status(400).json({error:'Unknown user'});
	}
	return res.json(user);
});
app.delete('/users/:id',(req,res)=>{
	const id=parseInt(req.params.id,10);
	if(!id){
		return res.status(400).json({error:'Incorrect id'});
	}
	const userIndex = users.findIndex(user => user.id === id);
	if(userIndex === -1){
		return res.status(400).json({error:'Unknown user'});
	}
	users.splice(userIndex,1);
	res.status(204).send();
});
app.post('/users',(req,res)=>{
	const name=req.body.name||'';
	if(!name.length){
		return res.status(400).json({error:'Incorrect name'});
	}
	const id= users.reduce((maxId,user)=>{
		return user.id > maxId ? user.id:maxId;
	},0)+1;
	const newUser = {
		id:id,
		name:name
	}
	users.push(newUser);
	return res.status(201).json(newUser);
});














/*function User(_name){
	this.name = _name;
}
User.prototype.greeting = function(){
	console.log('Hello');
	return this;
}
User.prototype.introduce = function(){
	console.log(`I am ${this.name}`);
	return this;
}

var chris =  new User('chris');
chris.gretting().introduce();*/