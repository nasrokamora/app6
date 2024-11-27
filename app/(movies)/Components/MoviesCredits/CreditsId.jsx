import { getCreditsId, getPersonsId, urlImage } from "@/app/libs/DataFetching"
import PersonDetails from "./PersonDetails"

export default async function CreditsId({ credit_id }) {
  const dataCreditId = await getCreditsId(credit_id)

  return (
    <section>
      <PersonDetails person_id={dataCreditId.person.id} key={dataCreditId.id} />
    </section>
  )
}