// जय माँ सरस्वती
#include<bits/stdc++.h>
#include<vector>
#include<algorithm>
#include<set>
#include<queue>
#include<stack>
#include<unordered_map>
#include<string>
using namespace std;
#define pb push_back
#define GCD(m,n) __gcd(m,n)
#define LCM(m,n)  m*(n/(__gcd(m,n)))
#define For(a,j,k) for(ll i=a;i<j;i+=k)
#define  ll long long int
#define  _max *max_element
#define  _min *min_element
const ll N=1000000007;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        vector<int> v(n);
        for(int i=0;i<n;i++){
            cin>>v[i];
        }
        set<int> s;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                s.insert(abs(v[i]-v[j]));
            }
        }
        cout<<s.size()<<endl;
    }
    return 0;
}