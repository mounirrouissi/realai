import Images from "@/components/Images";
import FaqList from "@/components/FaqList";
import Testimony from "@/components/Testimony";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import PreHeader from "@/components/PreHeader";
import Categories from "@/components/Categories";

type SearchParams={
  category?:string;
}

type Props ={
  searchParams:SearchParams;
}

export default function Home( {searchParams:{category}}:Props) {


console.log("Search params: ", category);

  return (
    <main className="mx-0">
                      <PreHeader />

                <Header />

<Prompt  />
<Categories />
      <Images category={category}/>
      <Testimony />
      <FaqList/>
    </main>
  );
}
