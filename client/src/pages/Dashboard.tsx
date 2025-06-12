import { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 16px;
  background: #121212;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.header`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const NotificationButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.2s;
  &:active {
    opacity: 0.7;
  }
`;

const BalanceCard = styled.div`
  height: 120px;
  border-radius: 16px;
  background: #1e1e1e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BalanceTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
`;

const BalanceAmount = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
`;

const BalanceChange = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: #aaaaaa;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:active {
    background: #272727;
  }
`;

const PillsRow = styled.div`
  display: flex;
  gap: 8px;
`;

interface PillProps { active: boolean }
const Pill = styled.button<PillProps>`
  height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  color: ${(p) => (p.active ? '#ffffff' : '#aaaaaa')};
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    display: ${(p) => (p.active ? 'block' : 'none')};
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #1e88e5;
  }
`;

const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 4px));
  gap: 8px;
`;

const CryptoCard = styled.div`
  height: 100px;
  border-radius: 12px;
  background: #1e1e1e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

const CryptoTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CryptoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const CryptoName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const CryptoValue = styled.span`
  font-size: 14px;
  color: #aaaaaa;
`;

interface CryptoPercentProps { positive: boolean }
const CryptoPercent = styled.span<CryptoPercentProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => (p.positive ? '#4caf50' : '#f44336')};
  margin-top: auto;
`;

const tokens = [
  { symbol: 'BTC', amount: '1.1272', value: '$67 203,95', change: 2.15 },
  { symbol: 'ETH', amount: '0.6948', value: '$1 801,73', change: 1.2 },
];

export default function Dashboard() {
  const [category, setCategory] = useState('Crypto');
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <Header>
        <AvatarRow>
          <Avatar src="https://via.placeholder.com/40" alt="avatar" />
          <Name>Mitchell Santos</Name>
        </AvatarRow>
        <NotificationButton onClick={toggleTheme}>🔔</NotificationButton>
      </Header>

      <BalanceCard>
        <BalanceTitle>Total balance</BalanceTitle>
        <BalanceAmount>$72 829,62</BalanceAmount>
        <BalanceChange>+2.15% today</BalanceChange>
      </BalanceCard>

      <ActionsRow>
        <ActionButton>+</ActionButton>
        <ActionButton>↑</ActionButton>
        <ActionButton>↓</ActionButton>
        <ActionButton>↔</ActionButton>
      </ActionsRow>

      <PillsRow>
        {['Crypto', 'Flat', 'Cards', 'Savings'].map(p => (
          <Pill key={p} active={p === category} onClick={() => setCategory(p)}>
            {p}
          </Pill>
        ))}
      </PillsRow>

      <CryptoGrid>
        {tokens.map(t => (
          <CryptoCard key={t.symbol}>
            <CryptoTop>
              <CryptoIcon>{t.symbol[0]}</CryptoIcon>
              <div>
                <CryptoName>{t.symbol}</CryptoName>
                <CryptoValue>{t.amount} SOL</CryptoValue>
              </div>
            </CryptoTop>
            <CryptoValue>{t.value}</CryptoValue>
            <CryptoPercent positive={t.change >= 0}>
              {t.change > 0 ? '+' : ''}
              {t.change}%
            </CryptoPercent>
          </CryptoCard>
        ))}
      </CryptoGrid>
    </Container>
  );
}
