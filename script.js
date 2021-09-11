function helpclicked()
{
    document.getElementById("helpb").classList.add("hideclass");
    document.getElementById("helpbox").classList.remove("hideclass");
}


var eqn;

function gen()
{
    document.getElementById("helpbox").classList.add("hideclass");
    document.getElementById("helpb").classList.remove("hideclass");
    eqn = document.getElementById("eqnform").value;
    document.getElementById("table1").innerHTML="";
    var arr ="";
    var variables = "";
    var v =0;
    for(var i = 0,j=0;i<eqn.length;i++)
    {
        if(eqn[i]=='(')
        {
            arr= arr.concat("(");
        }
        else if(eqn[i]==')')
        {
            arr= arr.concat(")"); 
        }
        else if(eqn[i]=='+' ||eqn[i]=='|' ||(eqn[i] == 'o' && eqn[i+1] == 'r' ) || eqn[i]=='v')
        {
            arr= arr.concat("|");
            if(eqn[i] == 'o' && eqn[i+1] == 'r' ) i++;
        }

        else if(eqn[i]=='.'||eqn[i]=='&'||(eqn[i] == 'a' && eqn[i+1] == 'n' && eqn[i+2] == 'd')|| eqn[i]=='^')
        {
            arr= arr.concat("&");
            if((eqn[i] == 'a' && eqn[i+1] == 'n' && eqn[i+2] == 'd')) i= i+2;
        }

        else if(eqn[i]=='!' || (eqn[i] == 'n' && eqn[i+1] == 'o' && eqn[i+2] == 't') ||eqn[i]=='~')
        {
            arr= arr.concat("!");
            if((eqn[i] == 'n' && eqn[i+1] == 'o' && eqn[i+2] == 't'))i= i+2;
        }
        else if(eqn[i]=='⊕'||(eqn[i] == 'x' && eqn[i+1] == 'o' && eqn[i+2] == 'r'))
        {
            arr= arr.concat("^");
            if((eqn[i] == 'x' && eqn[i+1] == 'o' && eqn[i+2] == 'r')) i= i+2;
        }
        else if((eqn[i]>='a'&&eqn[i]<='z')||(eqn[i]>='A'&&eqn[i]<='Z'))
        {
            
            var check = true;
            for(var j  =0 ;j<variables.length;j++)
            {
                if(variables[j]==eqn[i])
                {
                    check = false;
                    arr= arr.concat("vara["+j.toString()+"]");
                    break;
                }
            }
            if(check)
            {
            variables = variables.concat(eqn[i]);
            arr= arr.concat("vara["+(variables.length-1).toString()+"]");
            }
        }
        else if(eqn[i]==' ');
        else
        {
            document.getElementById("error").classList.remove("hideclass");
        }
    } 
   tablegenrater(variables,arr); 
}


function tablegenrater(v,e)
{
    var numberOfVariables = v.length;
    var htmlcode = "";
    var vara = [];
    //heding column of table 
    htmlcode = htmlcode.concat("<tr>");
    for(var i = 0;i<numberOfVariables;i++)
    {
       htmlcode = htmlcode.concat("<th>");
       htmlcode = htmlcode.concat(v[i]);
       htmlcode = htmlcode.concat("</th>");
    }
    htmlcode = htmlcode.concat("<th>");
       htmlcode = htmlcode.concat(eqn);
       htmlcode = htmlcode.concat("</th>");
    htmlcode = htmlcode.concat("</tr>");
    //end of headings


    //inserting data into table
    var rows = Math.pow(2,numberOfVariables);

    for(var i =0;i<rows;i++)
    {
        htmlcode = htmlcode.concat("<tr>");
      for( var j = 0;j<numberOfVariables;j++)
      {
        if((i%(Math.pow(2,numberOfVariables-j))) <= (( (rows-1) % (Math.pow(2,numberOfVariables-j))) / 2) ) vara[j]=0;
        else vara[j]=1;
      }
      
      for( var j = 0;j<numberOfVariables;j++)
      {
        htmlcode = htmlcode.concat("<td>");
        htmlcode = htmlcode.concat((vara[j]).toString());
        htmlcode = htmlcode.concat("</td>");
      }
      
       
        htmlcode = htmlcode.concat("<td>");
        var result = eval(e);
        if((result != undefined))
        {
        htmlcode = htmlcode.concat(result);
        document.getElementById("error").classList.add("hideclass");
        }
        else 
        document.getElementById("error").classList.remove("hideclass");
        htmlcode = htmlcode.concat("</td>");
        //result end
        //row ends
        htmlcode = htmlcode.concat("</tr>");
    }
    console.log(v);
    console.log(e);
    document.getElementById("table1").innerHTML=htmlcode;
}


