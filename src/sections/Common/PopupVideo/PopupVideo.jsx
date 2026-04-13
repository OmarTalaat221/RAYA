const PopupVideo = ({ setIsActive, isActive, setPopup, popup }) => {
  const closePopup = () => {
    setPopup(false);
    const iframe = document.getElementById("youtube-video");
    if (iframe) {
      iframe.src = "";
    }
    setIsActive(false);
    document.body.style.overflow = "unset";
  };
  return (
    <div
      className={`popup-video ${popup ? "popup" : "popdown"}`}
      onClick={closePopup}
    >
      <div className={`video-wrapper ${isActive ? "active" : ""}`}>
        <iframe
          id="youtube-video"
          className="video"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/cnVuVtbbZgs?si=UQVMsmBriHPfD6Vf"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="mfp-close" onClick={closePopup}>
          ×
        </button>
      </div>
    </div>
  );
};

export default PopupVideo;
