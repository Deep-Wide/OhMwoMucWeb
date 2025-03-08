import { useEffect } from "react";

const useScript = (src, isAsync = true, type = "text/javascript") => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = isAsync;
        script.type = type;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);
};

export default useScript;