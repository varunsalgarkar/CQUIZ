interface BrandLogoProps{
    src:string;
    alt?: string;
    classname?:string;
}
export const BrandLogo = ({
    src,
    alt = "Brand Logo",
    classname = " "
}: BrandLogoProps ) => {
    return (
        <div className={'fixed bottom-0 right-4 z-10 ${className}'}>
            <img 
                src={src}
                alt = {alt}
                className="w-16 h-16 sm:w-20 md:w-34 md:h-24 lg:w-52 lg:h-52 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
        </div>
    );
};