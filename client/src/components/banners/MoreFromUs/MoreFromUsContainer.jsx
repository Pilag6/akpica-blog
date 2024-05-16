import CardMoreFromUs from "./CardMoreFromUs.jsx";

import akiko from "../../../../../server/uploads/akiko.jpg";
import carlos from "../../../../../server/uploads/carlos.jpg";
import pila from "../../../../../server/uploads/Pila.jpg";

const MoreFromUsContainer = () => {
    return (
        <div className="w-full mt-11 px-4">
            <div className="max-w-[1200px] mx-auto flex flex-col justify-center flex-wrap gap-6">
                <h2 className="text-3xl font-[700]">MORE FROM US</h2>
                <div className="flex flex-wrap gap-5">

                    <CardMoreFromUs img={"https://bit.ly/3wtZT9o"} title={"JavaScript Learning Roadmap 🚀"} tag={"JAVASCRIPT"} avatar={pila} author={"Pila"} date={"May 25, 2024"}/>

                    <CardMoreFromUs img={"https://bit.ly/4bJ3W0t"} title={"Next.js App Router Routing patterns you should know"} tag={"NEXT"} avatar={akiko} author={"Akiko"} date={"May 20, 2024"}/>

                    <CardMoreFromUs img={"https://bit.ly/4bDbX75"} title={"Node.js 22 is now available"} tag={"NODE"} avatar={carlos} author={"Carlos"} date={"May 15, 2024"}/>
                    
                    <CardMoreFromUs img={"https://bit.ly/4bk0qcX"} title={"Vue Basics: Getting Started with Vue.js and VSCode"} tag={"VUE"} avatar={"/faviconBlack.png"} author={"Akpica"} date={"May 10, 2024"}/>
                    
                    <CardMoreFromUs img={"https://bit.ly/4bELVjJ"} title={"Next.js App Router Routing patterns you should know"} tag={"CSS"} avatar={pila} author={"Pila"} date={"May 05, 2024"}/>
                    
                    <CardMoreFromUs img={"https://bit.ly/3wC4AOi"} title={"New Atlas Administrator Learning Path"} tag={"MONGODB"} avatar={akiko} author={"Akiko"} date={"May 01, 2024"}/>
                    
                </div>
            </div>
        </div>
    );
};
export default MoreFromUsContainer;
