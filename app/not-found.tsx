import Container from "@/components/Container";
import StateInfo from "@/components/StateInfo";

export default function NotFound() {
  return (
    <Container className="flex justify-center">
      <StateInfo text="페이지 정보가 없습니다." />
    </Container>
  );
}
