import Container from "@/components/Container";
import StateInfo from "@/components/StateInfo";

export default function NotFound() {
  return (
    <Container>
      <div className="my-20 ">
        <StateInfo text="페이지 정보가 없습니다." />
      </div>
    </Container>
  );
}
