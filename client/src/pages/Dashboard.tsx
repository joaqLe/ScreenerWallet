import styled from 'styled-components'
import { useState } from 'react'

const Wrapper = styled.div`
  background: #f7f7f9;
  min-height: 100vh;
  padding: 16px;
`

const Card = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
`

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`

const Notification = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const Dot = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: #ff3b30;
  border-radius: 4px;
`

const BalanceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #888888;
`

const BalanceAmount = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #222222;
  margin-top: 4px;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`

const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const ActionBtn = styled.button<{color: string}>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: none;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  color: ${p => p.color};
  font-size: 20px;
  cursor: pointer;
`

const ActionLabel = styled.span`
  font-size: 10px;
  color: #333333;
`

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`

const Tab = styled.button<{active:boolean}>`
  position: relative;
  background: none;
  border: none;
  font-size: 12px;
  color: ${p=>p.active ? '#7e3ff2' : '#aaaaaa'};
  text-transform: uppercase;
  padding-bottom: 6px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #7e3ff2;
    display: ${p=>p.active ? 'block' : 'none'};
  }
`

const AssetCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const AssetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AssetLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`

const AssetText = styled.div`
  display: flex;
  flex-direction: column;
`

const AssetSymbol = styled.span`
  font-size: 16px;
  font-weight: 700;
`

const AssetAmount = styled.span`
  font-size: 12px;
  color: #666666;
`

const AssetChange = styled.span<{positive:boolean}>`
  font-size: 14px;
  color: ${p=>p.positive ? '#4caf50' : '#f44336'};
`

const TxSection = styled.div`
  margin-top: 24px;
`

const TxItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`

export default function Dashboard() {
  const [tab, setTab] = useState('Crypto')

  return (
    <Wrapper>
      <Card>
        <UserHeader>
          <AvatarRow>
            <Avatar src="https://placehold.co/40" />
            <Name>Mitchell Santos</Name>
          </AvatarRow>
          <Notification>
            🔔
            <Dot />
          </Notification>
        </UserHeader>
        <div style={{marginTop:'16px'}}>
          <BalanceTitle>
            <span>👁‍🗨</span>
            <span>Total balance</span>
          </BalanceTitle>
          <BalanceAmount>$72 829,62</BalanceAmount>
        </div>
        <Actions>
          <Action>
            <ActionBtn color="#2e7d32">＋</ActionBtn>
            <ActionLabel>Add saving</ActionLabel>
          </Action>
          <Action>
            <ActionBtn color="#f57c00">↓</ActionBtn>
            <ActionLabel>Withdraw</ActionLabel>
          </Action>
          <Action>
            <ActionBtn color="#1976d2">↑</ActionBtn>
            <ActionLabel>Top up</ActionLabel>
          </Action>
          <Action>
            <ActionBtn color="#7e3ff2">⇄</ActionBtn>
            <ActionLabel>Exchange</ActionLabel>
          </Action>
        </Actions>
        <Tabs>
          {['Crypto','Fiat','Card','Savings','📊'].map(t => (
            <Tab key={t} active={t===tab} onClick={()=>setTab(t)}>{t}</Tab>
          ))}
        </Tabs>
        <AssetCard>
          <AssetInfo>
            <AssetLogo>₿</AssetLogo>
            <AssetText>
              <AssetSymbol>BTC</AssetSymbol>
              <AssetAmount>1,1272 · $67 203,95</AssetAmount>
            </AssetText>
          </AssetInfo>
          <AssetChange positive>2,15%</AssetChange>
        </AssetCard>
        <AssetCard>
          <AssetInfo>
            <AssetLogo>Ξ</AssetLogo>
            <AssetText>
              <AssetSymbol>ETH</AssetSymbol>
              <AssetAmount>0,6948 · $1 801,73</AssetAmount>
            </AssetText>
          </AssetInfo>
          <AssetChange positive>1,12%</AssetChange>
        </AssetCard>
        <TxSection>
          <h4 style={{margin:0,color:'#333333'}}>Recent transactions</h4>
          <TxItem>
            <span>🔄 USDT to BTC</span>
            <span style={{fontSize:'12px',color:'#888'}}>2023-07-25</span>
            <span style={{color:'#4caf50',fontSize:'12px'}}>+0,0116 BTC</span>
          </TxItem>
        </TxSection>
      </Card>
    </Wrapper>
  )
}

