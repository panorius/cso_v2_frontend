import { Card as HeroCard, CardBody, CardHeader, CardFooter } from '@heroui/card';

// Wrapper pour compatibilité
export const Card = ({ children, className = '', ...props }: any) => (
  <HeroCard className={className} {...props}>
    <CardBody>{children}</CardBody>
  </HeroCard>
);

export { CardBody, CardHeader, CardFooter };
