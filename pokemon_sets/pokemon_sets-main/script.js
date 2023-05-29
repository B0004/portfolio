/* AUTOMATICALLY GENERATED FROM @smogon/sets, DO NOT EDIT! */

//document.getElementById("name").innerHTML=Object.keys(dex);

const color_table = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};
const names = document.getElementById("names");
var name_select = document.querySelector('input[list="names"]');
const name_list = Object.keys(dex);
const set_board = document.getElementById("set_board");
const display_name = document.getElementById("display_name");

//fill in options
for (var key in dex) {
    if (dex.hasOwnProperty(key)) {
        let option = document.createElement("option");
        option.text = key;
        option.value = key;
        
        
        names.append(option);
    }
}

name_select.addEventListener("input", function(){
    let name = name_select.value;
    if (name_list.includes(name)) {
        show_sets(name);
        name_select.value="";
    }
});


//display name and picture
function show_sets(name){
    set_board.innerHTML = "";
    display_name.innerHTML=name
    for (let set_name in dex[name]){+
        new_card(name, set_name)
    }
    //big_sprite
    /*
    let big_sprite = document.createElement("img");
    let hname = name.toLowerCase().replace(' ', '-');
    let big_src_string = "https://img.pokemondb.net/sprites/scarlet-violet/icon/" + hname  + ".png";
    big_sprite.src = big_src_string;
    big_sprite.className = "big_sprite";
    
    big_sprite.addEventListener("error", function(event) {
        event.target.src = "https://img.pokemondb.net/sprites/sword-shield/icon/" + hname  + ".png";
        big_sprite.addEventListener("error", function(event) {
            event.target.src = "https://img.pokemondb.net/sprites/scarlet-violet/icon/" + hname.split("-")[0]  + ".png";
            big_sprite.addEventListener("error", function(event) {
                event.target.src = "https://img.pokemondb.net/sprites/sword-shield/icon/" + hname.split("-")[0]  + ".png";
                big_sprite.addEventListener("error", function(event) {
                    event.target.src = "0.png";
                    
                })
            })
        })
    })
    search_wrapper.append(big_sprite);
    */
    
}
show_sets("Abomasnow");

function new_card(name, set_name){
    // card
    let card = document.createElement("div");
    card.className = "set_card";
    
    
    let lname = name.toLowerCase().replace('-','').replace(' ','');
    let type = pokedex[lname].types[0].toLowerCase();
    

    //top line
    let top_line = document.createElement("div");
    top_line.className = "title_line";
    top_line.id = "top";
    card.append(top_line);

    //title bar
    let title_bar = document.createElement("div");

    //top and bottom line color
    title_string = "1.5px solid " + color_table[type];
    title_bar.style.borderTop = title_string;
    // has second type
    if (pokedex[lname].types.length > 1){
        title_string = "1.5px solid " + color_table[pokedex[lname].types[1].toLowerCase()];
    }
    title_bar.style.borderBottom = title_string;

    title_bar.className = "title_bar";
       
   // set title
   let set_name_button = document.createElement("button");
   set_name_button.className = "set_name_button";
   set_name_button.innerHTML = set_name;
   //let v =  "\262F"
   //set_name_button.setAttribute("data-symbol", v);
   
   title_bar.append(set_name_button);

    // export button
    let export_button = document.createElement("button");
    export_button.className = "export_button";
    export_button.innerHTML = "\<\< EXPORT \>\>";
    export_button.onclick = function(){
        let set_text = export_button.children[0].innerHTML;
        navigator.clipboard.writeText(set_text);
        // Alert the copied text
        alert("UwU Copied the set to your clipboard! Click OK first though: \n\n" + set_text);
    };
    title_bar.append(export_button);

    //title_bar click function

        set_name_button.addEventListener("click", function() {
          var content = card.children[3];
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      
    
    
    card.append(title_bar);
    
    //bottom bar
    let bot_line = document.createElement("div");
    bot_line.className = "title_line";
    bot_line.id = "bot";
    card.append(bot_line);


    let set_content = document.createElement("div");
    set_content.className = "set_content";

    card.append(set_content);
    const ev_table = {
        "hp": "HP",
        "at": "Atk",
        "df": "Def",
        "sa": "SpA",
        "sd": "SpD",
        "sp": "Spe",
    };
    

    // everything else
    for (var ele in dex[name][set_name]){
        new_ele(card, name, set_name, ele);
    }
    function new_ele(card, name, set_name, ele){
        if (ele == "evs" || ele == "ivs"){
            let ev_field = document.createElement("div");
            let ev_title = document.createElement("p");
            ev_title.innerHTML = "EVs: ";
            if (ele == "ivs"){
                ev_title.innerHTML = "IVs: ";
            }
            ev_field.append(ev_title);
            ev_field.className = ele + "_field";
            for (ev in dex[name][set_name][ele]){
                let attribute = document.createElement("p");
                attribute.className = ele;

                attribute.innerHTML = ev_table[ev] + ": " + dex[name][set_name][ele][ev];
                ev_field.append(attribute);
            }
            set_content.append(ev_field);
        } else if (ele == "teraType"){
            let type_color = color_table[dex[name][set_name][ele].toLowerCase()];

            let attribute = document.createElement("p");
            let tera_type_content = document.createElement("p");

            attribute.classList.add(ele, "exp");
            tera_type_content.className = "tera_type_content";
            tera_type_content.classList.add("tera_type_content", "exp");

            attribute.innerHTML = "TERA TYPE: ";
            tera_type_content.innerHTML = dex[name][set_name][ele].toUpperCase();

            shadow_string = "1px 1px " + type_color;
            
            tera_type_content.style.textShadow = shadow_string;
            set_content.append(attribute);
            set_content.append(tera_type_content);

        } else{
            let attribute = document.createElement("p");
            attribute.classList.add(ele, "exp");
            attribute.innerHTML = ele.toUpperCase() + ": " + dex[name][set_name][ele];
            set_content.append(attribute);
        };
    }
    
    
    //get ev/iv
    let ev_string = "";
    for (ev in dex[name][set_name]["evs"]){
        ev_string += (dex[name][set_name]["evs"][ev] + " " + ev_table[ev] + " / ");
    }
    let iv_string = "";
    for (iv in dex[name][set_name]["ivs"]){
        iv_string += (dex[name][set_name]["ivs"][iv] + " " + ev_table[iv] + " / ");
    }
    set_board.append(card);
    
    //paste
    var paste_template =
`${name} @ ${dex[name][set_name]["item"]} 
Ability: ${dex[name][set_name]["ability"]}
Tera Type: ${dex[name][set_name]["teraType"] || ""}
EVs: ${ev_string}
IVs: ${iv_string}
${dex[name][set_name]["nature"]} Nature
- ${dex[name][set_name]['moves'][0]}
- ${dex[name][set_name]["moves"][1]}  
- ${dex[name][set_name]["moves"][2]}  
- ${dex[name][set_name]["moves"][3]}
`;

    let paste_content = document.createElement("p");
    paste_content.className = "pokemon_paste";
    paste_content.innerHTML = paste_template;
    export_button.append(paste_content);
    paste_content.style.display="none";
}

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

