import { Suspense } from "react"
import ProfileDetailPage from "./[id]/page"
import ProfilesPage from "./profilePage"
const Page = ()=>{

  return (
    <Suspense>
      <ProfilesPage/>
    </Suspense>
  )
}


export default Page