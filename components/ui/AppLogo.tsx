import Image from "next/image";

interface AppLogoProps {
    variant?: "horizontal" | "square";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    priority?: boolean;
}

export default function AppLogo({
    variant = "horizontal",
    size = "md",
    className = "",
    priority = false,
}: AppLogoProps) {
    if (variant === "horizontal") {
        const sizes = {
            sm: { width: 87, height: 32 },
            md: { width: 131, height: 48 },
            lg: { width: 175, height: 64 },
            xl: { width: 240, height: 88 },
        };
        const dim = sizes[size];
        return (
            <Image
                src="/assets/logo-horizontal.png"
                alt="ArthaLoka Logo"
                width={dim.width}
                height={dim.height}
                className={className}
                priority={priority}
                style={{ objectFit: "contain" }}
            />
        );
    }

    const squareSizes = {
        sm: { width: 32, height: 32 },
        md: { width: 48, height: 48 },
        lg: { width: 64, height: 64 },
        xl: { width: 96, height: 96 },
    };
    const dim = squareSizes[size];

    return (
        <Image
            src="/assets/favicon.png"
            alt="ArthaLoka Icon"
            width={dim.width}
            height={dim.height}
            className={className}
            priority={priority}
            style={{ objectFit: "contain" }}
        />
    );
}
