import TrendingTvAll from "@/app/(tv)/Components/TrendingTv/TrendingAll";




export default function Layout({ children }) {
    return(
        <div>
        {children}
        <TrendingTvAll/>
        </div>
    )
}