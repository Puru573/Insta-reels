
import React, { useEffect} from 'react'

function InterObserver() {
    const callback = (entries) => {
        entries.forEach((entry) => {
          let ele = entry.target.childNodes[0];
          
          console.log(ele);
          ele.play().then(() => {
            if (!ele.paused && !entry.isIntersecting) {
              console.log("123", entry.isIntersecting);
              ele.pause();
            }
          });
        });
      };
      let options = {
        // root: document.querySelector("#scrollArea"),
        // rootMargin: "0px",
        threshold: 0.6,
      };
  
      let observer = new IntersectionObserver(callback, options);
      useEffect(() => {
        const elements = document.querySelectorAll(".videos");
        elements.forEach((element) => {
          observer.observe(element);
        });
      }, []);
  return (
    <div className="video-container">
        <div className='videos'>
            <video src="https://firebasestorage.googleapis.com/v0/b/insta-reels-36051.appspot.com/o/JCS6O4OqlgREERwrG5heKJghRZ23%2Fposts%2F1c63ff75-0a94-4f8a-8a91-17e321aada44?alt=media&token=e7559471-9ad9-4d96-8ceb-05ca5574b43f" muted/>
        </div>

        <div className='videos'>
            <video src="https://firebasestorage.googleapis.com/v0/b/insta-reels-36051.appspot.com/o/uev6c9EvUcYPHgrCfF1blMLE4zI3%2Fposts%2Fb08d3551-7701-431e-b036-c7fad093458b?alt=media&token=eeb98a26-61ec-4e35-9ac3-87f01620d011" muted/>
        </div>

        <div className='videos'>
            <video src="https://firebasestorage.googleapis.com/v0/b/insta-reels-36051.appspot.com/o/62aWOPcQVYQaGnG9G3BRsUm3PWd2%2Fposts%2Ffc9c69c8-f502-485b-ac8d-e249010e43ba?alt=media&token=29c7bb26-404d-494f-a5a4-e11bbae515f3" muted/>
        </div>

    </div>
  )
}

export default InterObserver