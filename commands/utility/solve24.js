const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('solve24')
	.setDescription('Solves a 24 game')
	.addNumberOption(option =>
		option.setName('num1')
			.setDescription('a number')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('num2')
			.setDescription('a number')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('num3')
			.setDescription('a number')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('num4')
			.setDescription('a number')
			.setRequired(true))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];

module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const num1 = interaction.options.getNumber('num1');
		const num2 = interaction.options.getNumber('num2');
		const num3 = interaction.options.getNumber('num3');
		const num4 = interaction.options.getNumber('num4');
var ar=[],order=[0,1,2],op=[],val=[];
var NOVAL=9999,oper="+-*/",out;

function rnd(n){return Math.floor(Math.random()*n)}

function say(s){
 try{document.write(s+"<br>")}
 catch(e){WScript.Echo(s)}
}

function getvalue(x,dir){
 var r=NOVAL;
 if(dir>0)++x;
 while(1){
  if(val[x]!=NOVAL){
   r=val[x];
   val[x]=NOVAL;
   break;
  }
  x+=dir;
 }
 return r*1;
}

function calc(){
 var c=0,l,r,x;
 val=ar.join('/').split('/');
 while(c<3){
  x=order[c];
  l=getvalue(x,-1);
  r=getvalue(x,1);
  switch(op[x]){
   case 0:val[x]=l+r;break;
   case 1:val[x]=l-r;break;
   case 2:val[x]=l*r;break;
   case 3:
   if(!r||l%r)return 0;
   val[x]=l/r;
  }
  ++c;
 }
 return getvalue(-1,1);
}

function shuffle(s,n){
 var x=n,p=eval(s),r,t;
 while(x--){
  r=rnd(n);
  t=p[x];
  p[x]=p[r];
  p[r]=t;
 }
}

function parenth(n){
 while(n>0)--n,out+='(';
 while(n<0)++n,out+=')';
}

function getpriority(x){
 for(var z=3;z--;)if(order[z]==x)return 3-z;
 return 0;
}

function showsolution(){
 var x=0,p=0,lp=0,v=0;
 while(x<4){
  if(x<3){
   lp=p;
   p=getpriority(x);
   v=p-lp;
   if(v>0)parenth(v);
  }
  out+=ar[x];
  if(x<3){
   if(v<0)parenth(v);
   out+=oper.charAt(op[x]);
  }
  ++x;
 }
 parenth(-p);
 return out;
}

function solve24(s){
 var z=4,r;
 while(z--)ar[z]=s.charCodeAt(z)-48;
 out="";
 for(z=100000;z--;){
  r=rnd(256);
  op[0]=r&3;
  op[1]=(r>>2)&3;
  op[2]=(r>>4)&3;
  shuffle("ar",4);
  shuffle("order",3);
  if(calc()!=24)continue;
  return showsolution();
  break;
 }
}

		var solution = solve24(String(num1)+num2+num3+num4);
		//output message
		await interaction.reply({ content: 
		"solution: `"+ solution +"`",
		ephemeral: false });
	},
};
