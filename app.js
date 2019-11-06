window.addEventListener("load", () => {
    const tl = new TimelineMax();
    const intro = document.querySelector("#intro");
    const box = document.querySelector("#smallBox");
    const circles = document.querySelectorAll(".logos");
    const techNames = document.querySelectorAll(".logos span");
    const folder = document.querySelector("#folder");
    const secondPageLine = document.querySelector(".middleLine");
    const leftColumn = document.querySelector("#leftColumn");
    const rightColumn = document.querySelector("#rightColumn");
    const projectsTitle = document.querySelector("#projectsTitle");
    const contactTitle = document.querySelector("#contactTitle");
    const asplogo = document.querySelector(".projectBox");
    const clogo = document.querySelectorAll(".projectBox")[1];
    const umllogo = document.querySelectorAll(".projectBox")[2];
    const exp = document.querySelector("#projectsTitle h3");
    let counter = 0;


    new fullpage('#fullPage', {
        anchors:['firstPage', 'secondPage', 'thirdPage'],
        autoScrolling:true,
        navigation:true,
        onLeave: function(origin, destination, direction){
            var leavingSection = this;
            if (origin.index == 0 && direction == "down")
            {
                //setTimeout(shack, 3000);
                tl.fromTo(secondPageLine,1.5,{y:'100%',opacity:0},{y:'0%',opacity:0.88}),0.7;

                for ( let i = 0;i<circles.length;i++)
                {
                    tl.fromTo(circles[i],1.35,{x:'-100%',opacity:0},{x:'0%',opacity:1},2.1);
                }
                for ( let i = 0;i<techNames.length;i++)
                {
                    tl.fromTo(techNames[i],1.5,{y:'100%',opacity:0},{y:'0%',opacity:1},"-=1.25");
                }
               
            }
            else if(origin.index == 1 && direction == 'up'){
                tl.fromTo(intro,1.5,{y:'100%',opacity:0},{y:'0%',opacity:1});
            }
            else if (origin.index == 1 && direction == 'down' && counter != 1) {
               //Here i deleted inserting of image
                    //And a timer (timeout) to display projectsTitle as a block

                    function populateExperienceBlock() {
                tl.fromTo(projectsTitle,1.5,{height:''},{height:'75%'})
                .fromTo(exp,0.7,{y:'0%'},{y:'-150%',color:'white'})
                .fromTo(asplogo,1.25,{x:'-100%',opacity:'0'},{x:'0%',opacity:'1'})
                .fromTo(clogo,1.25,{x:'-100%',opacity:'0'},{x:'0%',opacity:'1'},)
                .fromTo(umllogo,1.25,{x:'-100%',opacity:'0'},{x:'0%',opacity:'1'});
   
                counter = 1;
                 }
                 populateExperienceBlock() ;

            }
        },
    });
    tl.fromTo(intro,1.5,{y:'100%',opacity:0},{y:'0%',opacity:1});
    
 

    
    




















    function shack() {
        let t = setInterval(rotateRight,300);
        function rotateRight() {
        folder.style.transform ="rotate(0deg)";
        }
        t = setInterval(rotateLeft,500);
        function rotateLeft() {
        folder.style.transform ="rotate(0deg)";
        }
        folder.addEventListener("mouseenter",() =>
        clearInterval(t)
            );
    }
    
    });
